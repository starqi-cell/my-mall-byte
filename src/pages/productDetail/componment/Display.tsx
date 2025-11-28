import React,{memo,useState} from 'react';
import type { FC,ReactNode } from 'react';
import { Col, Row, Image, Space } from 'antd';
import { Product } from '../../../types';

interface IProps {
    Images: Product['images'];
    children?: ReactNode;
}

const Display: FC<IProps> = memo((props) => {
    const [selectedImageId, setSelectedImage] = useState(0);
    const { Images } = props;
    return (
        <Row gutter={[0,24]}>
            <Col span={24}>
            <Image src={Images[selectedImageId]} fallback="https://placehold.co/600?text=No+Image" />
          </Col>
          <Col span={24} style={{ marginTop: 16 }}>
            {
              Images && Images.length > 0 && (
                <Space>
                  {Images.map((img, index) => (
                    <Image 
                      key={index} 
                      src={Images[index]}
                      width={80}
                      height={80}
                      style={{ objectFit: 'cover' }}
                      onClick={() => setSelectedImage(index)}
                    />
                    ))}
                </Space>
                )
            }
            </Col>
        </Row>
    );
});

export default memo(Display);