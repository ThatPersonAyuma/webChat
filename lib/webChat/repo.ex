defmodule WebChat.Repo do
  use Ecto.Repo,
    otp_app: :webChat,
    adapter: Ecto.Adapters.SQLite3
end
