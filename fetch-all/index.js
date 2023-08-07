const urls = ["https://url1.com", "https://url2.com", "https://url3.com"];

const mockFetch = async (url) => {
  switch (url) {
    case "https://url1.com": {
      return { x: 1, y: true };
    }
    case "https://url2.com": {
      return { z: "hello" };
    }
    case "https://url3.com": {
      return { x: 2 };
    }
  }
};

const fetchAll = async (urls) => {
  const errors = [];
  const requests = urls.map((url) =>
    mockFetch(url).catch((e) => errors.push(e))
  );

  const responses = await Promise.all(requests);

  const result = await responses.reduce((acc, response) => {
    return { ...acc, ...response };
  }, {});

  return { result, errors };
};

fetchAll(urls).then(({ result, errors }) => {
  console.log(result);
  console.log(errors);
});
