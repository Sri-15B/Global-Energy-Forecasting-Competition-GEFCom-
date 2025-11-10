# ⚡ Global Energy Forecasting Competition (GEFCom)

## 📘 Project Overview
This project predicts future electricity load using the **GEFCom dataset**.  
It uses a **Random Forest Regressor** to analyze historical energy consumption and time-based features to forecast power demand.

## 📊 Dataset
- Source: GEFCom (Kaggle)
- Files include hourly load data for multiple regions:
  - AEP_hourly.csv  
  - COMED_hourly.csv  
  - DAYTON_hourly.csv  
  - DOM_hourly.csv  
  - PJMW_hourly.csv  

## 🤖 Model
- Algorithm: **Random Forest Regressor**
- Features: Day, Month, Year, DayOfWeek, Previous Day Load
- Evaluation Metrics: R², MAE, RMSE

## 📈 Results
The model provides accurate short-term forecasts for electricity demand, supporting better energy management and grid planning.

## 🛠️ Tools Used
- Python  
- Google Colab  
- Pandas, NumPy, Matplotlib, Scikit-learn  

## 📂 Repository Structure
data/ → raw dataset files
notebook/ → Colab notebook for training and analysis
README.md → project description
