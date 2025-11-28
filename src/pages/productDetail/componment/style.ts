import styled from 'styled-components';
import { List } from 'antd';

export const StyledList = styled(List)`
  border: 1px solid #e8e8e8; 
  border-radius: 8px;        
  background-color: #c2e2ffff;    
  overflow: hidden;          


  .ant-list-item {

    padding: 20px 24px !important; 
    
 
    border-bottom: 1px solid #f0f0f0 !important;
    

    color: #333;
    

    &:hover {
        background-color: #97c7ffff;
    }

    &:last-child {
      border-bottom: none !important;
    }
  }
`