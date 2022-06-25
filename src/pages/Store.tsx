import { Col, Row } from 'react-bootstrap'
import StoreItem from '../components/StoreItem'
import items from '../data/items.json'

function Store() {
  return (
    <>
      <h2>Store</h2>
      <Row md={2} xs={1} lg={3} className="g-3">
        {items.map(item => <Col key={item.id}><StoreItem {...item} /></Col>)}
      </Row>
    </>
  )
}

export default Store