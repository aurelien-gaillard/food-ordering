import React, { useState } from 'react'
import RestaurantList from '../components/RestaurantList'
import { Col, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap'

export default function Home() {
  const [query, updateQuery] = useState('')

  return (
    <div className='container-fluid'>
      <Row>
        <Col>
          <div className='search'>
            <InputGroup>
              <InputGroupAddon addonType='append'> Search </InputGroupAddon>
              <Input
                onChange={(e) =>
                  updateQuery(e.target.value.toLocaleLowerCase())
                }
                value={query}
              />
            </InputGroup>
          </div>
          <RestaurantList search={query} />
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin: 20px;
            width: 500px;
          }
        `}
      </style>
    </div>
  )
}
