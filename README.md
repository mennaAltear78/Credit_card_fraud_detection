# Credit Card Fraud Detection Project

## Overview

An end-to-end full-stack machine learning engineering project designed to analyze and classify financial bank transactions to detect fraudulent activities with high precision, mitigating financial losses caused by unauthorized transactions. The application features a dynamic React frontend integrated with a robust FastAPI backend service.

## Implementation Steps

* **Data Loading & Configuration:** Loaded the credit card transactions dataset (`creditcard.csv`), consisting of 284,807 rows and 31 columns. Configured Pandas display options and set `RANDOM_STATE = 42` to ensure full reproducibility.
* **Exploratory Data Analysis (EDA):**
* Verified that the dataset contains zero missing or null values.
* Identified and handled 1,081 duplicate rows (approximately 0.38% of the data).
* Confirmed the absence of constant or quasi-constant features that provide no predictive value.
* Analyzed feature characteristics, noting that `Time` and `Amount` are the only raw variables not transformed by PCA, while features `V1` through `V28` represent PCA components.
* Evaluated feature skewness, revealing a high right-skewness of 16.97 for the `Amount` feature, whereas `Time` exhibits a relatively uniform distribution.


* **Target Distribution & Class Imbalance Analysis:** Discovered a severe class imbalance within the target variable:
* **Legitimate Transactions (Class 0):** Account for **99.8%** of the dataset.
* **Fraudulent Transactions (Class 1):** Represent only **0.2%** of the dataset.



## Key Challenges

* **Severe Class Imbalance:** With fraud accounting for only 0.2% of transactions, a naive model could easily achieve 99.8% accuracy simply by predicting all transactions as legitimate (Class 0), which is operationally catastrophic. This was resolved by discarding Accuracy as a primary metric and instead optimizing for **Precision, Recall, F1-Score, PR-AUC, and Confusion Matrix**, prioritizing a high **Recall** for Class 1 to minimize false negatives.
* **High Skewness in Financial Amounts:** The wide variance in transaction amounts (ranging from 0 to over 25,000) with long tails and extreme outliers required careful scaling strategies to prevent model bias.

## Applied Solutions & Pipeline Architecture

* **Robust Scikit-Learn Pipelines:** Built modular pipelines integrating data preprocessing and scaling steps directly with models to prevent data leakage.
* **Algorithm Benchmarking:** Developed an experimental framework to evaluate robust classification models, including Logistic Regression, Decision Trees, Random Forest, Gradient Boosting, Support Vector Machines (SVM), K-Nearest Neighbors (KNN), and XGBoost Classifiers.
* **Cross-Validation Strategy:** Implemented **Stratified K-Fold Cross-Validation** to ensure the minority fraudulent class is proportionally represented across all training and testing folds.
* **Full-Stack Integration (React & FastAPI):** Developed a responsive React dashboard frontend for real-time risk classification and batch CSV file analysis, connected to a high-performance FastAPI backend serving the trained machine learning model endpoints with user authentication and transaction logging.
