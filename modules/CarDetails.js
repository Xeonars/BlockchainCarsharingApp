import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const CarDetails = props => {
    const rental = props.navigation.getParam('rental').item;

    return (
        <Card style={styles.card}>
            <Card.Title title="Car Details" subtitle={rental[0]} />
            <Card.Content>
                <Title>Owner:</Title>
                <Paragraph>{rental[1]}</Paragraph>
                <Title>Current Tenant:</Title>
                <Paragraph>{rental[2]}</Paragraph>
                <Title>Price:</Title>
                <Paragraph>{rental[3]}</Paragraph>
                <Title>Balance:</Title>
                <Paragraph>{rental[5]}</Paragraph>
            </Card.Content>
        </Card>
    );
};

export default CarDetails;

const styles = StyleSheet.create({
    card: { padding: 20, marginVertical: 8, marginHorizontal: 16 },
    title: {
        fontSize: 16,
    },
});
