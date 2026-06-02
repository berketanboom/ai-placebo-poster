# fNIRS Preprocessing and Analysis Pipeline

## 1. Overview
This repository contains scripts used to reproduce the poster-consistent exploratory fNIRS analysis for the study ‘Neuro-Cognitive Dynamics of AI Attribution in Music.’

## 2. Input files
- .oxy files: HbO/HbR signal files exported from COBI/fNIR software
- .mrk files: marker files containing trial and label events

## 3. Event markers
- 1 = trial start
- 11/12 = label reveal
- 9 = stimulus end

## 4. Retained fNIRS sample
n = 13 participants retained after quality control.

## 5. Preprocessing steps
1. Load .oxy and .mrk files
2. Inspect HbO/HbR signals
3. Apply participant/file QC
4. Apply 4th-order zero-phase Butterworth filter, 0.01–0.2 Hz
5. Apply local baseline correction using −10 to 0 s pre-label interval
6. Extract 4–15 s post-label HRF response window
7. Compute Right/Left PFC ROI averages
8. Extract HbO2 Peak
9. Compute participant-level AI–Human differences
10. Run t-tests and trial-level LME models

## 6. Primary neural metric
HbO2 Peak in Right and Left PFC ROIs.

## 7. Statistical analyses
Participant-level paired/one-sample t-test on AI–Human difference scores and trial-level LME with participant random intercept.

## 8. Interpretation rule
Participant-level t-test showed a trend; trial-level LME provided convergent support. Due to n = 13, neural results are exploratory and require replication.

## 9. Limitations
- Small retained fNIRS sample
- High channel/participant exclusion
- HRF window is literature-informed but exploratory
- HbR/Deoxy should be reported as complementary inspection rather than a primary inferential result unless analyzed explicitly

## 10. Reproducibility note
These scripts are provided for transparency. They should be used to reproduce and audit the analysis, not to imply that the fNIRS findings are definitive.
