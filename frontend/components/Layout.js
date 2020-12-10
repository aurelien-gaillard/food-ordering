import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { Container, Nav, NavItem } from 'reactstrap'
import { logout } from '../lib/auth'
import { useUserContext } from '../context/user_context'

export default function Layout({ children }) {
  const { user, setUser } = useUserContext()
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
            {user ? (
              <h5>{user.username}</h5>
            ) : (
              <Link href='/register'>
                <a className='nav-link'>Register</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
            {user ? (
              <Link href='/'>
                <a
                  className='nav-link'
                  onClick={() => {
                    logout()
                    setUser(null)
                  }}
                >
                  Logout
                </a>
              </Link>
            ) : (
              <Link href='/login'>
                <a className='nav-link'>Sign in</a>
              </Link>
            )}
          </NavItem>
        </Nav>
      </Wrapper>
      <Container>{children}</Container>
    </div>
  )
}
const Wrapper = styled.header`
  a {
    color: white;
  }
  h5 {
    color: white;
    padding-top: 11px;
  }
`
