//uses Fetch API to retrieve json data and handle the response as a data stream
//because of scoping I need to set a complete relative path, otherwise the file wont be found and throw error 404
fetch('../data/SMHI_merged_simplified_data.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });