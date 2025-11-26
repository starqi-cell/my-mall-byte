import styled from 'styled-components';

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; 
  width: 100%;
  min-height: 500px; /* 设置最小高度，确保布局稳定 */
  height: 100%;
  flex-grow: 1;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .ant-radio-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    max-height: 300px; /* 调整最大高度，避免过高 */
    min-height: 120px; /* 添加最小高度，确保布局稳定 */
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