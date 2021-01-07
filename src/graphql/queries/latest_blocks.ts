import { gql } from '@apollo/client';

export const LATEST_BLOCKS = gql`
  query LatestBlocks ($limit: Int){
    blocks: block(limit: $limit, order_by: {height: desc}) {
      height
      num_txs
      hash
      timestamp
      validator {
        validator_description {
          moniker
          validator_address
          identity
        }
      }
    }
  }
`;
