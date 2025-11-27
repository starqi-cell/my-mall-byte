import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  .lg-only {
    @media (min-width: 992px) {
      display: none;
    }
  }

    .ant-select {
        width: 140px;
    }
`

