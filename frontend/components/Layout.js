import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { Nav, NavItem } from 'reactstrap'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Food ordering system</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Wrapper>
        <Nav className='navbar navbar-dark bg-dark'>
          <NavItem>
            <Link href='/'>
              <a className='navbar-brand'>Home</a>
            </Link>
          </NavItem>

          <NavItem className='ml-auto'>
            <Link href='/login'>
              <a className='nav-link'>Sign In</a>
            </Link>
          </NavItem>

          <NavItem>
            <Link href='/register'>
              <a className='nav-link'> Sign Up</a>
            </Link>
          </NavItem>
        </Nav>
      </Wrapper>
      {children}
    </div>
  )
}
const Wrapper = styled.header`
  a {
    color: red;
  }
`
