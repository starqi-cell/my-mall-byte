import {memo} from 'react';
import type { FC,ReactNode } from 'react';
import { Product } from '../../../types';
import { List, Rate, Typography, Avatar, Space } from 'antd';
import dayjs from 'dayjs';
import { StyledList } from './style';

interface IProps {
    reviews:Product['reviews'];
    children?: ReactNode;
}

const { Title, Text, Paragraph } = Typography;

const Reviews: FC<IProps> = memo((props) => {


    const { reviews } = props;
    const safeReviews = reviews ?? [];
    if(safeReviews.length === 0){
        return <div></div>;
    }
return (
    <>
    <div style={{marginBottom: 40}}>
    <Title style={{display: 'inline'}} level={3}>用户评价</Title>
        <Rate disabled allowHalf value={safeReviews.reduce((acc, cur) => acc + cur.rating, 0) / safeReviews.length} style={{ fontSize: 14, color: '#faad14', marginLeft: 10 }} />
    </div>
    <StyledList
      itemLayout="vertical"
      dataSource={safeReviews}
      renderItem={(item: any) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>
                {item.reviewerName?.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <Text strong>{item.reviewerName}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    ({item.reviewerEmail})
                  </Text>
                </Space>
                
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {dayjs(item.date).format('YYYY-MM-DD')}
                </Text>
              </div>
            }
            description={
              <Rate disabled allowHalf value={item.rating} style={{ fontSize: 14, color: '#faad14' }} />
            }
          />
          
          <Paragraph 
            style={{ 
              marginTop: 8, 
              marginLeft: 48, 
              marginBottom: 0 
            }}
          >
            {item.comment}
          </Paragraph>
        </List.Item>
        
      )}
    />
    </>
  );
});

export default memo(Reviews);