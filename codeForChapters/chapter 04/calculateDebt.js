/* eslint-disable */

const calculateDebt = async (id) => {
  // access a database to get a list of invoices
  const listOfInvoices =
    await mySqlConn.query(/* SQL query to get invoices */);

  // call a remote service to learn what's owed for each
  const owedAmounts =
    await axios.get(/* API call to get owed amounts */);

  const calculatedDebt = owedAmounts.reduce(
    (x, y) => x + y,
    0
  );
  return calculatedDebt;
};

const calculateDebt2 = async (
  id,
  { getInvoices, getOwedAmounts } = {
    getInvoicesFromDb,
    getOwedAmountFromAPI,
  }
) => {
  const listOfInvoices = await getInvoices(id);
  const owedAmounts = await getOwedAmounts(listOfInvoices);
  const calculatedDebt = owedAmounts.reduce(
    (x, y) => x + y,
    0
  );

  return calculatedDebt;
};

export {};
