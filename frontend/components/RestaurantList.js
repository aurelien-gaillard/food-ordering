import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from 'reactstrap'

const RestaurantList = (props) => {
  const [restoList, setRestoList] = useState([])

  const fetchData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/restaurants`)
      .then(function (response) {
        // handle success
        setRestoList(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  if (restoList.length != 0) {
    const searchQuery = restoList.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    )
    return (
      <Row>
        {searchQuery.map((res) => (
          <Col xs='6' sm='4' key={res.id}>
            <Card style={{ margin: '0 0.5rem 20px 0.5rem' }}>
              <CardImg
                top={true}
                style={{ height: 250 }}
                src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardText>{res.description}</CardText>
              </CardBody>
              <div className='card-footer'>
                <Link
                  as={`/restaurants/${res.id}`}
                  href={`/restaurants?id=${res.id}`}
                >
                  <a className='btn btn-primary'>View</a>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
        <style jsx global>
          {`
            a {
              color: white;
            }
            a:link {
              text-decoration: none;
              color: white;
            }
            a:hover {
              color: white;
            }
            .card-columns {
              column-count: 3;
            }
          `}
        </style>
      </Row>
    )
  }
  return <h2>Nic</h2>
}

export default RestaurantList
