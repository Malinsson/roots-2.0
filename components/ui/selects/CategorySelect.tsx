import {
  BorderRadius,
  Colors,
  Spacing,
  Styles,
} from "@/constants/design-system";
import { Category } from "@/interfaces";
import { addCategory, getCategories } from "@/services/categoryService";
import { SWEDISH_BANNED_WORDS } from "@/utils/bannedWords";
import { containsUnsafeInput } from "@/utils/validation";
import { Profanity } from "@2toad/profanity";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const profanity = new Profanity();

function containsBannedWords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return SWEDISH_BANNED_WORDS.some((word) => lowerText.includes(word));
}

export function CategorySelect({
  value,
  onValueChange,
  placeholder = "Välj kategori",
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCats() {
      const cats = await getCategories();
      setCategories(cats);
    }
    fetchCats();
  }, []);

  const filteredCategories = searchText.trim()
    ? categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchText.toLowerCase()),
      )
    : categories;

  const categoryExists = categories.some(
    (cat) => cat.name.toLowerCase() === searchText.toLowerCase(),
  );

  const showAddButton = searchText.trim().length > 0 && !categoryExists;

  const dropdownData = filteredCategories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  if (showAddButton) {
    dropdownData.push({
      label: `+ Lägg till "${searchText}"`,
      value: `ADD_NEW:${searchText}`,
    });
  }

  const handleDropdownChange = async (item: any) => {
    if (item.value.startsWith("ADD_NEW:")) {
      const categoryName = item.value.replace("ADD_NEW:", "");
      setError("");

      if (
        containsUnsafeInput(categoryName) ||
        profanity.exists(categoryName) ||
        containsBannedWords(categoryName)
      ) {
        setError("Kategorins namn innehåller otillåtet språk");
        return;
      }

      setIsAddingCategory(true);
      try {
        const newCategory = await addCategory(categoryName);
        setCategories([...categories, newCategory]);
        onValueChange(newCategory.id);
        setSearchText("");
      } catch (err) {
        setError("Kunde inte lägga till kategori");
        console.error(err);
      } finally {
        setIsAddingCategory(false);
      }
    } else {
      onValueChange(item.value);
      setSearchText("");
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={[Styles.bodyM, styles.placeholderStyle]}
        selectedTextStyle={[Styles.bodyM, styles.selectedTextStyle]}
        containerStyle={styles.containerStyle}
        itemTextStyle={[Styles.bodyM, styles.itemTextStyle]}
        itemContainerStyle={styles.itemContainerStyle}
        activeColor="#f0f0f0"
        data={dropdownData}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={handleDropdownChange}
        search={true}
        searchPlaceholder="Lägg till eller sök kategori..."
        onChangeText={setSearchText}
        renderItem={(item) => (
          <View style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
            <Text
              style={[
                Styles.bodyM,
                item.value.startsWith("ADD_NEW:") && { color: "#333333ff" },
              ]}
            >
              {item.label}
            </Text>
          </View>
        )}
        renderRightIcon={() => (
          <Ionicons name="swap-vertical" size={15} color={Colors.details} />
        )}
      />

      {error && (
        <Text style={[Styles.bodyS, { color: "#ff0000" }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: Spacing.m,
  },
  dropdown: {
    flex: 1,
    height: 46,
    borderWidth: 2,
    borderColor: Colors.details,
    borderRadius: BorderRadius.m,
    paddingHorizontal: 24,
    backgroundColor: Colors.secondary,
    paddingVertical: 8,
  },
  placeholderStyle: {
    color: Colors.details,
  },
  selectedTextStyle: {
    color: Colors.details,
  },
  containerStyle: {
    borderRadius: BorderRadius.m,
    borderWidth: 1,
    borderColor: Colors.light,
    marginTop: 4,
  },
  itemTextStyle: {
    color: Colors.details,
  },
  itemContainerStyle: {
    borderRadius: BorderRadius.m,
  },
});
