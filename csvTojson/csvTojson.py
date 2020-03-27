import pandas as pd

dataFile = 'data/2018_SCB_BEFOLK_MANGD_simplified_data.csv'

#Read CSV file content and store in dataFrame
df = pd.read_csv(dataFile, encoding='utf8')

#Print to se data result and write to json file
print(df.tail(10))