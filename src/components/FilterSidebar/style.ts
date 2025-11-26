import styled from 'styled-components';

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; 
  width: 100%;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .ant-radio-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    max-height: 400px; 
    overflow-y: auto;  
    padding-right: 4px; 

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #999;
    }
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;