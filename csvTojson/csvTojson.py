import pandas as pd

dataFile = 'data/SMHI_month_year_normal_61_90_precipitation_mm_ORIGINALDATA.txt'
stations = 'data/SMHI_metobs_precipitationType24Hours_all_sites_ORIGINALDATA.csv'

#Read CSV file content and store in dataFrame, also converts City column in data to a new string with no whitespace
#df = pd.read_csv(dataFile, encoding='utf-8', converters = {'City' : strip})
df = pd.read_csv(stations, encoding='utf-8', sep=';')
dft = pd.read_fwf(dataFile, encoding='utf-8')

#Sort values in column Id ascending from .CSV file
dfsort = df.sort_values(by=['Id'])

print("-----------DF-------------")

print(dfsort.columns)
print(dfsort.head(10))

print("-----------DFT-------------")
#Changes klimnr column name to Id for easier matching of dataframes
dft.rename(columns = {'klimnr': 'Id'}, inplace=True)

#Remove unwanted month columns from dataframe, only keeping sum data of year, id and period
dft.drop(['jan','feb','mar','apr','maj','jun','jul','aug','sep','okt','nov','dec'], axis=1, inplace=True)

#Sort values in column Id ascending from .TXT file
dftsort = dft.sort_values(by=['Id'])

print(dftsort.columns)
print(dftsort.head(10))

#result = pd.merge(dfsort,dftsort, right_index=True, left_index=True)
#resort = result.sort_values(by=['Id'])
print("-----------RESULT-------------")
#print(resort)

#print restructured data to json format
#resort.to_json("data/2018_SCB_BEFOLK_MANGD_simplified_data.json", force_ascii=True, orient="records")
