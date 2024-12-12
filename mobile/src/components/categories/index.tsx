import { FlatList } from "react-native";
import { Category } from "../category";
import { s } from "./styles";

export type ListCategoriesProps = {
  id: string;
  name: string;
}[];

type CategoriesProps = {
  data: ListCategoriesProps;
  selected: string;
  onSelect: (id: string) => void;
};

export function Categories({ data, selected, onSelect }: CategoriesProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          onPress={() => onSelect(item.id)}
          isSelected={selected === item.id}
        />
      )}
      horizontal
      contentContainerStyle={s.content}
      style={s.container}
      showsHorizontalScrollIndicator={false}
    />
  );
}
