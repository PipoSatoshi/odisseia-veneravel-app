const logout = async () => {
  try {
    // Limpa o estado imediatamente para evitar redirecionamento de volta
    setUser(null);
    setLoading(false);
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Erro ao terminar sessão:', error);
  }
};