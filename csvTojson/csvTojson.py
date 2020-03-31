import pandas as pd

dataFile = 'data/SMHI_month_year_normal_61_90_precipitation_mm_ORIGINALDATA.txt'
stations = 'data/SMHI_metobs_precipitationType24Hours_all_sites_ORIGINALDATA.csv'

#Read CSV file content and store in dataFrame, also converts City column in data to a new string with no whitespace
df = pd.read_csv(stations, encoding='utf-8', sep=';')
dft = pd.read_fwf(dataFile, encoding='utf-8')

print("-----------DF-------------")
#Remove unwanted height and active column, only keeping wanted columns id, namn, Latitud and Longitude
df.drop(['Höjd (m)', 'Aktiv'], axis=1, inplace=True)

#Sort values in column Id ascending from .CSV file
dfsort = df.sort_values(by=['Id'])
#Resets index to make dataframes match by index
dfsort = dfsort.reset_index(drop=True)

print(dfsort.columns)
print(dfsort)

print("-----------DFT-------------")
#Remove unwanted month columns from dataframe, only keeping sum data of year, id and period
dft.drop(['period','jan','feb','mar','apr','maj','jun','jul','aug','sep','okt','nov','dec'], axis=1, inplace=True)

#Sort values in column Id ascending from .TXT file
dftsort = dft.sort_values(by=['klimnr'])

print(dftsort.columns)
print(dftsort)

print("-----------RESULT-------------")
mergedData = pd.merge(dfsort,dftsort, right_index=True, left_index=True)

#Removing last not needed column after sorting and mergind with index
mergedData.drop('klimnr', axis=1, inplace=True)
print(mergedData)

#write restructured data to json format
mergedData.to_json("data/SMHI_merged_simplified_data.json", force_ascii=True, orient="records")

#Code for reading and verifying data in finished JSON file
#js = pd.read_json("data/2018_SCB_BEFOLK_MANGD_simplified_data.json", encoding='utf-8')
#print('-------------js------------')
#print(js.sort_values(by=['Id']))