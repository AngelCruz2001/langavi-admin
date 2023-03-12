import { IOrder } from '@/interfaces';
import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from '@react-email/components';

export const ShippingInfoEmail = ({ order }: { order: IOrder }) => (
    <Html>
        <Head />
        <Preview>Get your order summary, estimated delivery date and more</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={track.container}>
                    <Row>
                        <Column>
                            <Text style={global.paragraphWithBold}>Número de guía</Text>
                            <Text style={track.number}>{order.guideNumber}</Text>
                        </Column>
                        <Column align="right">
                            <Text style={global.paragraphWithBold}>Proveedor de envíos</Text>
                            <Text style={track.number}>{order.shippingProvider}</Text>
                        </Column>
                    </Row>
                </Section>
                <Hr style={global.hr} />
                <Section style={message}>
                    <Img
                        src='https://www.langavi.com/_next/image?url=%2Flogo.webp&w=640&q=75'
                        width={100}
                        alt="langavi"
                        style={{ margin: 'auto' }}
                    />
                    <Heading style={global.heading}>Tu pedido va en camino</Heading>
                    <Text style={global.text}>
                        Hemos procesado tu envío y ya se encuentra en camino a tu domicilio. Para revisar el progreso del envío ingresa al Sitio Oficial del proveedor de envíos e ingresa el número de guía.
                    </Text>
                </Section>
                <Hr style={global.hr} />
                <Section style={global.defaultPadding}>
                    <Text style={adressTitle}>Enviando a: {order.shippingAddress.firstName} {order.shippingAddress.lastName}</Text>
                    <Text style={{ ...global.text, fontSize: 14, textTransform: "capitalize" }}>
                        {order.shippingAddress.address}, {order.shippingAddress.city}. CP: {order.shippingAddress.zip}
                    </Text>
                </Section>
                <Hr style={global.hr} />
                <Section
                    style={{ ...paddingX, paddingTop: '40px', paddingBottom: '40px' }}
                >
                    {
                        order.products.map(({ _id, image, quantity, title, variantName }) => (
                            <Row key={_id} style={{ margin: '20px 0' }} >
                                <Column>
                                    <Img
                                        src={image}
                                        alt={title}
                                        style={{ margin: '0 auto' }}
                                        width={80}
                                        height={80}
                                    />
                                </Column>
                                <Column style={{ verticalAlign: 'top', paddingLeft: '0px' }}>
                                    <Text style={{ ...paragraph, fontWeight: '500', textTransform: "capitalize" }}>
                                        {title}
                                    </Text>
                                    <Text style={global.text}>{variantName}</Text>
                                    <Text style={global.text}>{`${quantity} ${quantity > 1 ? 'cajas' : 'caja'}`}</Text>
                                </Column>
                            </Row>
                        ))
                    }
                </Section>
                <Hr style={global.hr} />
                <Section style={global.defaultPadding}>
                    <Row style={{}}>
                        <Column style={{}}>
                            <Text style={global.paragraphWithBold}>Número de pedido</Text>
                            <Link href={`https://langavi.com/pedidos/${order.orderNumber}`} style={track.number}>{order.orderNumber}</Link>
                        </Column>
                        <Column style={{}}>
                            <Text style={global.paragraphWithBold}>Fecha de compra</Text>
                            <Text style={track.number}>{order.paidAt}</Text>
                        </Column>
                    </Row>
                </Section>
                <Hr style={global.hr} />
                <Section style={paddingY}>

                    <Text style={{ ...footer.text, paddingTop: 10, paddingBottom: 30 }}>
                        Para cualquier duda o aclaración por favor contáctanos. (No respondas este email)
                    </Text>
                    <Text style={footer.text}>
                        © 2023 Langavi. Todos los derechos reservados.
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default ShippingInfoEmail;

const paddingX = {
    paddingLeft: '40px',
    paddingRight: '40px',
};

const paddingY = {
    paddingTop: '22px',
    paddingBottom: '22px',
};

const paragraph = {
    margin: '0',
    lineHeight: '2',
};

const global = {
    paddingX,
    paddingY,
    defaultPadding: {
        ...paddingX,
        ...paddingY,
    },
    paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
    heading: {
        marginTop: '10px',
        fontSize: '32px',
        lineHeight: '1.3',
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: '-1px',
    } as React.CSSProperties,
    text: {
        ...paragraph,
        color: '#747474',
        fontWeight: '500',
    },
    button: {
        border: '1px solid #929292',
        fontSize: '16px',
        textDecoration: 'none',
        padding: '10px 0px',
        width: '220px',
        display: 'block',
        textAlign: 'center',
        fontWeight: 500,
        color: '#000',
    } as React.CSSProperties,
    hr: {
        borderColor: '#E5E5E5',
        margin: '0',
    },
};

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '10px auto',
    width: '600px',
    border: '1px solid #E5E5E5',
};

const track = {
    container: {
        padding: '22px 40px',
        backgroundColor: '#F7F7F7',
    },
    number: {
        margin: '12px 0 0 0',
        fontWeight: 500,
        lineHeight: '1.4',
        color: '#6F6F6F',
    },
};

const message = {
    padding: '40px 74px',
    textAlign: 'center',
} as React.CSSProperties;

const adressTitle = {
    ...paragraph,
    fontSize: '15px',
    fontWeight: 'bold',
    textTransform: 'capitalize'
} as React.CSSProperties;;

const recomendationsText = {
    margin: '0',
    fontSize: '15px',
    lineHeight: '1',
    paddingLeft: '10px',
    paddingRight: '10px',
};

const recomendations = {
    container: {
        padding: '20px 0',
    },
    product: {
        verticalAlign: 'top',
        textAlign: 'left' as const,
        paddingLeft: '2px',
        paddingRight: '2px',
    },
    title: { ...recomendationsText, paddingTop: '12px', fontWeight: '500' },
    text: {
        ...recomendationsText,
        paddingTop: '4px',
        color: '#747474',
    },
};

const menu = {
    container: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px',
        backgroundColor: '#F7F7F7',
    },
    content: {
        ...paddingY,
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    title: {
        paddingLeft: '20px',
        paddingRight: '20px',
        fontWeight: 'bold',
    },
    text: {
        fontSize: '13.5px',
        marginTop: 0,
        fontWeight: 500,
        color: '#000',
    },
    tel: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '32px',
        paddingBottom: '22px',
    },
};

const footer = {
    policy: {
        width: '166px',
        margin: 'auto',
    },
    text: {
        margin: '0',
        color: '#AFAFAF',
        fontSize: '13px',
        textAlign: 'center',
    } as React.CSSProperties,
};