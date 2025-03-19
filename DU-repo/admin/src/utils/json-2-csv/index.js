const convertToCsv = (
  json,
  error = () => {
    // This is an intentional empty function.
  }
) => {
  try {
    let csv = '';
    if (json?.titles && json.titles.length > 0) {
      csv += json.titles.join(',') + '\n';
      for (let i = 0; json.data.length > 0 && i < json.data.length; i++) {
        const row = [];
        for (let j = 0; j < json.titles.length; j++) {
          row.push(json.data[i][json.titles[j]]);
        }

        for (let k = 0; k < row.length; k++) {
          row[k] = row[k].replace(/["',]/g, '');
        }

        csv += row.join(',') + '\n';
      }
    } else {
      throw new Error(
        'No titles found in object. This function expects an object formatted like this:' +
          '{\n' +
          "  'titles' : ['name','age','city'],\n" +
          "  'data' : [\n" +
          "    {'name': 'John', 'age': '25', 'city': 'New York'},\n" +
          "    {'name': 'Jane', 'age': '24', 'city': 'New York'},\n" +
          "    {'name': 'Joe', 'age': '26', 'city': 'New York'}\n" +
          '  ]\n' +
          '}\n' +
          "'titles' is an array of the titles at the top of the resulting csv and 'data' is an array of the rows following the titles."
      );
    }

    return csv;
  } catch (error_) {
    error(error_.message);
    return null;
  }
};

const convertToJson = (
  csv,
  error = () => {
    // This is an intentional empty function.
  }
) => {
  try {
    const json = {};
    const lines = csv?.split(/\r?\n/);
    if (lines && lines.length > 0) {
      const titles = lines[0].split(',');
      json.titles = titles;
      json.data = [];
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        const rowObject = {};
        for (const [j, title] of titles.entries()) {
          rowObject[title] = row[j];
        }

        json.data.push(rowObject);
      }
    } else {
      throw new Error(
        'No lines found in csv. This function expects a string in csv format like this:' +
          '"name,age,city' +
          'John,25,New York' +
          'Jane,24,New York' +
          'Joe,26,New York"'
      );
    }

    return json;
  } catch (error_) {
    error(error_.message);
    return null;
  }
};

const json2Csv = { convertToCsv, convertToJson };

export default json2Csv;
