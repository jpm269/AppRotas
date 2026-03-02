type LoginResponse = {
  token: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
};

export async function loginRequest(email: string, password: string) {
  const url = "http://0.0.0.0:8000/login";

  console.log("LOGIN -> a chamar:", url, { email });

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch (err) {
    console.log("LOGIN -> erro de rede:", err);
    throw new Error("Erro de rede. A API está ligada? (host/porta/firewall)");
  }

  const rawText = await res.text();
  console.log("LOGIN -> status:", res.status);
  console.log("LOGIN -> resposta raw:", rawText);

  let data: any = null;
  try {
    data = rawText ? JSON.parse(rawText) : null;
  } catch {
    // não era JSON
  }

  if (!res.ok) {
    const msg = data?.detail || data?.message || "Credenciais inválidas";
    throw new Error(msg);
  }

  if (!data?.token) {
    throw new Error("Resposta inválida do servidor (faltou token).");
  }

  return data.token as string;
}