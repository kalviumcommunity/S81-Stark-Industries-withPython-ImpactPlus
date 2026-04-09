# Data Organization Guidelines

This document outlines how to organize data in the NGO resource allocation project.

## Folder Structure

- `data/raw/`: Store original, unmodified NGO program data (cost, participation, outcomes)
- `data/processed/`: Store cleaned or transformed datasets
- `outputs/`: Store results, reports, and visualizations

## Naming Conventions

Use clear, meaningful names for all files:

### Raw Data Files

- `raw_program_participation_2024.csv`
- `raw_cost_data_q1_2024.xlsx`
- `raw_outcome_metrics_education.xlsx`

### Processed Data Files

- `processed_cleaned_participation_data.csv`
- `processed_normalized_cost_data.csv`
- `processed_aggregated_outcomes_by_region.csv`

### Output Files

- `impact_analysis_report.pdf`
- `cost_benefit_visualization.png`
- `program_effectiveness_summary.docx`

## Important Rules

- Never modify files in `data/raw/`
- Always derive processed data from raw data
- Keep outputs separate from data
- Use version control to track changes
- Document any transformations in code comments or separate logs
