import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";
import { CartProductMap } from "@/src/types/cartTypes";

interface Props {
  cartProducts: CartProductMap;
  onAddPress: () => void;
}

export const CartTable: React.FC<Props> = ({ cartProducts, onAddPress }) => {
  const cartArray = Object.entries(cartProducts); // [ [uuid, { title, quantity, price }], ... ]

  const total = cartArray.reduce((sum, [, product]) => {
    return sum + product.price * product.quantity;
  }, 0);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Produto</Text>
        <Text style={styles.headerCell}>Qtd</Text>
        <Text style={styles.headerCell}>Preço</Text>
      </View>

      {/* Lista com scroll */}
      <ScrollView style={styles.scrollArea}>
        {cartArray.map(([uuid, product]) => (
          <View key={uuid} style={styles.row}>
            <Text style={styles.cell}>{product.title}</Text>
            <Text style={styles.cell}>{product.quantity}</Text>
            <Text style={styles.cell}>R$ {product.price.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Total */}
      <Text style={styles.totalText}>
        Total: R$ {total.toFixed(2)}
      </Text>

      {/* Botão */}
      <View style={styles.buttonContainer}>
        <Button title="Adicionar" onPress={onAddPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 6,
    marginBottom: 6,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  scrollArea: {
    flex: 1,
    maxHeight: Dimensions.get("window").height * 0.5,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  cell: {
    flex: 1,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});