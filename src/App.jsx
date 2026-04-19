// ... importlar aynı

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');

  // HATA ÇÖZÜMÜ 2: Bağımlılık eklendi
  useEffect(() => {
    console.log('[Analytics] Liste öğe sayısı:', items.length);
  }, [items]); // items her değiştiğinde çalışır

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => p.name.toLowerCase().includes(q));
  }, [items, searchQuery]);

  const addProduct = ({ name, category }) => {
    // HATA ÇÖZÜMÜ 3: Daha güvenli ID üretimi
    const id = crypto.randomUUID(); 
    setItems((prev) => [...prev, { id, name, quantity: 1, category }]);
  };

  // HATA ÇÖZÜMÜ 1: State Mutasyonu düzeltildi (Immutability)
  const incrementQuantity = (id) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decrementQuantity = (id) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: Math.max(0, p.quantity - 1) } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeProduct = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const totalPieces = items.reduce((sum, p) => sum + p.quantity, 0);

  return (
    // ... JSX kısımları aynı
  );
}