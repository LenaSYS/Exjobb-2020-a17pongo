import pandas as pd

dataFile = 'data/2018_SCB_BEFOLK_MANGD_simplified_data.csv'

#Function for cleaning up empty whitespace from dataset
def strip(text):
    try:
        return text.strip()
    except AttributeError:
        return text

#Read CSV file content and store in dataFrame, also converts City column in data to a new string with no whitespace
df = pd.read_csv(dataFile, encoding='utf-8', converters = {'City' : strip})

#Print to se data result, used for testing
print(df["Population"]) #before manip
extr = df.Population.str.replace(',', '')

print(extr.astype(int).head(10)) #after manip
df['Population'] = extr.astype(int) #converting finish manip data to int

#print restructured data to json format
df.to_json("data/2018_SCB_BEFOLK_MANGD_simplified_data.json", force_ascii=True, orient="records")
