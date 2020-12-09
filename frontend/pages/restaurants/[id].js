import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from 'reactstrap'
import axios from 'axios'

function Restaurants(props) {
  const [resto, setResto] = useState([])
  const router = useRouter()
  console.log(router.query)
  const fetchData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${router.query.id}`)
      .then(function (response) {
        setResto(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {
    fetchData()
  }, [router])
  console.log(resto)

  if (resto.dishes && resto.dishes.length == 0) {
    return 'Error Loading Dishes'
  }
  if (resto.dishes && resto.dishes.length !== 0) {
    return (
      <>
        <h1>{resto.name}</h1>
        <Row>
          {resto.dishes.map((res) => (
            <Col xs='6' sm='4' style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: '0 10px' }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className='card-footer'>
                  <Button outline color='primary'>
                    + Add To Cart
                  </Button>

                  <style jsx>
                    {`
                      a {
                        color: white;
                      }
                      a:link {
                        text-decoration: none;
                        color: white;
                      }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      .btn-outline-primary {
                        color: #007bff !important;
                      }
                      a:hover {
                        color: white !important;
                      }
                    `}
                  </style>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    )
  } else {
    return <div>Nic</div>
  }
}

export default Restaurants
