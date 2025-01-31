import Link from 'next/link'
import React from 'react'
import { Button, Container, Card } from 'react-bootstrap'
import Search from '../components/Search/Search'
import { getHeadElement } from '../utils/SSRUtils'

function Success() {
    return (
        <div className="page">
            {getHeadElement('Payment successful')}
            <Container>
                <Search />
                <Card>
                    <Card.Header>
                        <Card.Title style={{ color: '#40ff00' }}>Your payment was handled successfully!</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <p>You will get your features within the next few minutes.</p>
                        <p>
                            If any problems should occur please contact us via <Link href="/feedback">the contact page</Link>.
                        </p>
                        <Link href="/">
                            <a className="disableLinkStyle">
                                <Button>Return to main page</Button>
                            </a>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Success
