export const postCall = async (payload, url) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const deleteCall = async (payload, url) => {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const getCall = async url => {
  const res = await fetch(url);
  return await res.json();
};
