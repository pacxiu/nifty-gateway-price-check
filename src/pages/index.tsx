import { useEffect, useState } from 'react';
import { makeRequest } from 'services/http';
import { Box, Button, Container, Flex, Grid, Text } from 'theme-ui';

import pieces from 'data/pieces.json';

const TOTAL_PIECES = pieces.length;

type PieceData = {
  name: string;
  lastSale: string;
  highestBid: string;
};

const centsToDollars = (cents: number) =>
  (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export default function HomePage() {
  const [piecesData, setPiecesData] = useState<PieceData[]>();
  const [count, setCount] = useState(0);
  const [fetching, setFetching] = useState(false);

  const fetchData = async () => {
    setCount(0);
    setPiecesData([]);
    setFetching(true);

    const CORS = 'https://cors.bridged.cc/';
    const BASE_URL = 'https://api.niftygateway.com//market/summary-stats/';

    const fetchedData: PieceData[] = [];

    for (let i = 0; i < TOTAL_PIECES; i += 1) {
      const data = await makeRequest(`${CORS}${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractAddress: pieces[i].contractAddress,
          niftyType: pieces[i].niftyType,
        }),
      });

      fetchedData.push({
        name: pieces[i].name,
        lastSale: centsToDollars(data.last_sale_amount_in_cents),
        highestBid: centsToDollars(data.highest_bid_in_cents),
      });
      setCount(i + 1);
    }

    setPiecesData(fetchedData);
    setFetching(false);
  };

  return (
    <Container py={4}>
      <Box mb={2}>
        <Button onClick={fetchData}>Fetch Prices</Button>
      </Box>
      {piecesData && piecesData.length > 0 ? (
        <Grid>
          {piecesData.map(({ name, lastSale, highestBid }) => (
            <Grid columns={3} key={name} sx={{ width: '600px' }}>
              <Text>{name}</Text>
              <Text>
                Last Sale: <Text as="strong">{lastSale}</Text>
              </Text>
              <Text>Highest Bid: {highestBid}</Text>
            </Grid>
          ))}
        </Grid>
      ) : fetching ? (
        <Text>
          Loading... {count}/{TOTAL_PIECES}
        </Text>
      ) : null}
    </Container>
  );
}
