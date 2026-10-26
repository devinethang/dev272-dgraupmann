import { fetchPosts, Post } from "@/api/posts";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setPosts(await fetchPosts());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const controller = new AbortController();

  (async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setPosts(await response.json());
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return; // expected on unmount
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  })();

  return () => controller.abort();
}, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Pressable onPress={load}><Text style={styles.link}>Try again</Text></Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(p) => String(p.id)}
      renderItem={({ item }) => <Text style={styles.row}>{item.title}</Text>}
      ListEmptyComponent={<Text style={styles.center}>No posts.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  error: { color: "#dc2626" },
  link: { color: "#2563eb" },
  row: { padding: 12 },
});