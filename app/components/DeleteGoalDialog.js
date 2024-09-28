import * as React from "react";
import { Dialog, Paragraph, Button, Portal } from "react-native-paper";
import { StyleSheet } from "react-native";

const DeleteGoalDialog = ({ visible, onConfirm, onCancel }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel} style={styles.dialog}>
        <Dialog.Title style={styles.dialogTitle}>
          Potwierdź usunięcie
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph style={styles.dialogParagraph}>
            Czy na pewno chcesz usunąć ten cel?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={onCancel}
            mode="contained"
            style={[styles.button, { marginRight: 10 }]}
          >
            Anuluj
          </Button>
          <Button mode="contained" style={styles.button} onPress={onConfirm}>
            Usuń
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "rgb(21, 21, 21)", // Tło dialogu
  },
  dialogTitle: {
    color: "#eeeeee", // Kolor tytułu dialogu
  },
  dialogParagraph: {
    color: "#eeeeee", // Kolor tekstu w treści dialogu
    fontSize: 16,
  },
  button: {
    backgroundColor: "#a91d3a",
    paddingHorizontal: 6,
  },
});

export default DeleteGoalDialog;
