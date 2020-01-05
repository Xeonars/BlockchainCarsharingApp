import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Button,
    Paragraph,
    Dialog,
    Portal,
    ProgressBar,
    Colors,
} from 'react-native-paper';

const RentDialog = props => {
    return (
        <View>
            <Portal>
                <Dialog
                    visible={props.visible}
                    onDismiss={() => props.setVisible(false)}>
                    <Dialog.Title>Rent</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>The price is: {props.price}</Paragraph>

                        {props.progress !== 0 ? (
                            <ProgressBar
                                progress={props.progress}
                                color={
                                    props.progress === 1
                                        ? Colors.green800
                                        : Colors.red800
                                }
                            />
                        ) : null}

                        <Paragraph styles={styles.progressText}>
                            {props.progressText}
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            disabled={props.progress > 0 && props.progress < 1}
                            onPress={() => props.setVisible(false)}>
                            {props.progress === 0 ? 'Cancel' : 'Finish'}
                        </Button>
                        {props.progress === 0 ? (
                            <Button onPress={() => props.rent()}>Rent</Button>
                        ) : null}
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default RentDialog;

const styles = StyleSheet.create({
    progressText: {
        textAlign: 'center',
    },
});
