import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 400px; 
  flex-grow: 1;
  min-width: 250px;

  .ant-card {
    height: 100%;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    
    .ant-card-body {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }

 
  .filter-section {
    display: flex;
    flex-direction: column;
    gap: 8px;


    .category-scroll-area {
      .ant-radio-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 450px; 
        min-height: 150px; 
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

      min-height: 120px;
      display: flex;
      align-items: center; 
      justify-content: center;
    }
  }

  .price-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;