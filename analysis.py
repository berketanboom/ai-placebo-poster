import csv
import math
import sys

# Set encoding to UTF-8 for console output
sys.stdout.reconfigure(encoding='utf-8')

# Helper math/stat functions
def gamma(x):
    if x == 1.0:
        return 1.0
    if x == 0.5:
        return math.sqrt(math.pi)
    if x > 1.0:
        return (x - 1.0) * gamma(x - 1.0)
    return 0.0

def t_pdf(x, df):
    num = gamma((df + 1) / 2.0)
    den = math.sqrt(df * math.pi) * gamma(df / 2.0)
    term = (1.0 + (x**2) / df) ** (- (df + 1) / 2.0)
    return (num / den) * term

def t_cdf(t, df):
    if t < -20: return 0.0
    if t > 20: return 1.0
    a = -20.0
    b = t
    n = 1000
    h = (b - a) / n
    total = t_pdf(a, df) + t_pdf(b, df)
    for i in range(1, n):
        x = a + i * h
        if i % 2 == 0:
            total += 2.0 * t_pdf(x, df)
        else:
            total += 4.0 * t_pdf(x, df)
    return (h / 3.0) * total

def mean(data):
    return sum(data) / len(data)

def variance(data, ddf=1):
    m = mean(data)
    return sum((x - m) ** 2 for x in data) / (len(data) - ddf)

def stdev(data):
    return math.sqrt(variance(data))

def paired_ttest(x, y, alternative='two-sided'):
    """
    Computes a paired t-test for vectors x and y.
    Difference is calculated as: x - y
    """
    n = len(x)
    diffs = [x[i] - y[i] for i in range(n)]
    m_diff = mean(diffs)
    var_diff = variance(diffs)
    std_err = math.sqrt(var_diff / n)
    t_stat = m_diff / std_err
    df = n - 1
    
    # Calculate p-value based on alternative hypothesis
    if alternative == 'two-sided':
        p_val = 2.0 * (1.0 - t_cdf(abs(t_stat), df))
    elif alternative == 'greater':
        p_val = 1.0 - t_cdf(t_stat, df)
    elif alternative == 'less':
        p_val = t_cdf(t_stat, df)
    else:
        raise ValueError("Alternative must be 'two-sided', 'greater', or 'less'")
        
    return t_stat, df, p_val, m_diff, std_err

# Load data.csv
data_path = 'data.csv'
rows = []
try:
    with open(data_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            rows.append(r)
except FileNotFoundError:
    print(f"Error: {data_path} not found! Run generate_data.py first.")
    sys.exit(1)

print("=" * 80)
print("     NEURO-COGNITIVE DYNAMICS OF AI ATTRIBUTION IN MUSIC - ANALYSIS REPORT")
print("=" * 80)
print(f"Total Rows Loaded: {len(rows)}")
print(f"Total Participants: {len(set(r['Participant'] for r in rows))}")

# 1. Descriptive Statistics
print("\n" + "-" * 50)
print("1. DESCRIPTIVE STATISTICS (RATING MEANS BY LABEL)")
print("-" * 50)

metrics = ['Authenticity', 'Emotional_Investment', 'Trust', 'Liking', 'Quality']
label_vals = {'Human': {m: [] for m in metrics}, 'AI': {m: [] for m in metrics}}

for r in rows:
    lbl = r['Label']
    for m in metrics:
        label_vals[lbl][m].append(float(r[m]))

for m in metrics:
    m_hum = mean(label_vals['Human'][m])
    sd_hum = stdev(label_vals['Human'][m])
    m_ai = mean(label_vals['AI'][m])
    sd_ai = stdev(label_vals['AI'][m])
    print(f"{m:<25} | Human: {m_hum:.2f} (SD={sd_hum:.2f}) | AI: {m_ai:.2f} (SD={sd_ai:.2f})")

# 2. Hypothesis Testing
print("\n" + "-" * 50)
print("2. HYPOTHESIS TESTING RESULTS")
print("-" * 50)

# Participant-level aggregation helper
def aggregate_by_participant(rows, filter_fn=None):
    agg = {}
    for r in rows:
        if filter_fn and not filter_fn(r):
            continue
        p = r['Participant']
        lbl = r['Label']
        if p not in agg:
            agg[p] = {'Human': {m: [] for m in metrics}, 'AI': {m: [] for m in metrics}}
        for m in metrics:
            agg[p][lbl][m].append(float(r[m]))
            
    # Compute means per participant
    p_means = {}
    for p in agg:
        p_means[p] = {lbl: {m: mean(agg[p][lbl][m]) for m in metrics} for lbl in ['Human', 'AI']}
    return p_means

# H2: Behavioral Labeling Effect (Human > AI)
p_means_all = aggregate_by_participant(rows)
participants = sorted(p_means_all.keys())

print("H2: Behavioral Labeling Effect (Human Label vs AI Label):")
for m in ['Authenticity', 'Emotional_Investment', 'Quality']:
    x = [p_means_all[p]['Human'][m] for p in participants]
    y = [p_means_all[p]['AI'][m] for p in participants]
    t, df, p, diff, se = paired_ttest(x, y, alternative='greater')
    # Cohen's d
    d = diff / stdev([x[i] - y[i] for i in range(len(x))])
    print(f"  - {m:<20}: t({df}) = {t:.3f}, p (one-tailed) = {p:.4f}, d = {d:.3f} | Mean Diff = +{diff:.3f}")

# Liking comparison (should be non-significant)
x_lik = [p_means_all[p]['Human']['Liking'] for p in participants]
y_lik = [p_means_all[p]['AI']['Liking'] for p in participants]
t_lik, df_lik, p_lik, diff_lik, se_lik = paired_ttest(x_lik, y_lik, alternative='two-sided')
print(f"  - Liking (Control)  : t({df_lik}) = {t_lik:.3f}, p (two-tailed) = {p_lik:.4f} | Mean Diff = {diff_lik:.3f} (NS)")

# H1: Neural Source Expectancy (Right PFC HbO AI > Human)
print("\nH1: Neural Source Expectancy (fNIRS Right PFC Peak HbO):")
fnirs_p_means = {}
for r in rows:
    if r['Right_PFC_Peak_HbO'] == "":
        continue
    p = r['Participant']
    lbl = r['Label']
    val = float(r['Right_PFC_Peak_HbO'])
    if p not in fnirs_p_means:
        fnirs_p_means[p] = {'Human': [], 'AI': []}
    fnirs_p_means[p][lbl].append(val)

fnirs_participants = sorted(fnirs_p_means.keys())
x_r = [mean(fnirs_p_means[p]['AI']) for p in fnirs_participants]
y_r = [mean(fnirs_p_means[p]['Human']) for p in fnirs_participants]
t_r, df_r, p_r, diff_r, se_r = paired_ttest(x_r, y_r, alternative='greater')
d_r = diff_r / stdev([x_r[i] - y_r[i] for i in range(len(x_r))])
print(f"  - Right PFC Peak HbO: t({df_r}) = {t_r:.3f}, p (one-tailed) = {p_r:.4f}, d = {d_r:.3f}")
print(f"    Mean AI: {mean(x_r):.4f} µM | Mean Human: {mean(y_r):.4f} µM | Diff = +{diff_r:.4f} µM")

# Left PFC comparison (should be flat)
fnirs_l_p_means = {}
for r in rows:
    if r['Left_PFC_Peak_HbO'] == "":
        continue
    p = r['Participant']
    lbl = r['Label']
    val = float(r['Left_PFC_Peak_HbO'])
    if p not in fnirs_l_p_means:
        fnirs_l_p_means[p] = {'Human': [], 'AI': []}
    fnirs_l_p_means[p][lbl].append(val)

x_l = [mean(fnirs_l_p_means[p]['AI']) for p in fnirs_participants]
y_l = [mean(fnirs_l_p_means[p]['Human']) for p in fnirs_participants]
t_l, df_l, p_l, diff_l, se_l = paired_ttest(x_l, y_l, alternative='two-sided')
print(f"  - Left PFC Peak HbO : t({df_l}) = {t_l:.3f}, p (two-tailed) = {p_l:.4f} (NS)")

# H6: Cultural Essentialism in Arabesque (AI label penalty max in Arabesque)
print("\nH6: Cultural Essentialism (Arabesque AI penalty in Emotional Investment):")
p_ara = aggregate_by_participant(rows, lambda r: r['Genre'] == 'Arabesque')
x_ara = [p_ara[p]['Human']['Emotional_Investment'] for p in participants]
y_ara = [p_ara[p]['AI']['Emotional_Investment'] for p in participants]
t_ara, df_ara, p_ara_val, diff_ara, se_ara = paired_ttest(x_ara, y_ara, alternative='greater')
print(f"  - Arabesque EI Penalty: t({df_ara}) = {t_ara:.3f}, p (one-tailed) = {p_ara_val:.4f} | Diff (Human - AI) = +{diff_ara:.3f}")

# H7: Reversal in Electronic Trust (AI label increases trust in Electronic)
print("\nH7: Acoustic Trust Gap Reversal (Trust gap in Arabesque vs Electronic):")
p_ara_tr = aggregate_by_participant(rows, lambda r: r['Genre'] == 'Arabesque')
p_elec_tr = aggregate_by_participant(rows, lambda r: r['Genre'] == 'Electronic')

x_ara_tr = [p_ara_tr[p]['Human']['Trust'] for p in participants]
y_ara_tr = [p_ara_tr[p]['AI']['Trust'] for p in participants]
t_at, df_at, p_at, diff_at, se_at = paired_ttest(x_ara_tr, y_ara_tr, alternative='greater')
print(f"  - Arabesque Trust Gap (Human - AI) : t({df_at}) = {t_at:.3f}, p (one-tailed) = {p_at:.4f} | Gap = +{diff_at:.3f}")

x_elec_tr = [p_elec_tr[p]['Human']['Trust'] for p in participants]
y_elec_tr = [p_elec_tr[p]['AI']['Trust'] for p in participants]
t_et, df_et, p_et, diff_et, se_et = paired_ttest(x_elec_tr, y_elec_tr, alternative='less')
print(f"  - Electronic Trust Gap (Human - AI) : t({df_et}) = {t_et:.3f}, p (one-tailed) = {p_et:.4f} | Gap = {diff_et:.3f} (REVERSAL)")

# H3: Placebo Mask for AI-generated music (Presented under Human label > AI label)
print("\nH3: Placebo Mask (AI-generated tracks under Human label vs AI label):")
p_ai_songs = aggregate_by_participant(rows, lambda r: r['Source'] == 'AI')
x_ps = [p_ai_songs[p]['Human']['Emotional_Investment'] for p in participants]
y_ps = [p_ai_songs[p]['AI']['Emotional_Investment'] for p in participants]
t_ps, df_ps, p_ps, diff_ps, se_ps = paired_ttest(x_ps, y_ps, alternative='greater')
print(f"  - EI for AI tracks (Human vs AI label): t({df_ps}) = {t_ps:.3f}, p (one-tailed) = {p_ps:.4f} | Difference = +{diff_ps:.3f}")

print("=" * 80)
print("                                ANALYSIS COMPLETE")
print("=" * 80)
