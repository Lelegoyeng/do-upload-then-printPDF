# Cara setting printer windows 11 yang gagal ke windows 10
 - Buka Local Group Policy Editor masuk ke Administrative Templates / Printers / Configure RPC Connection settings enable protocol ( RPC overTCP ) - Default
 - Buka Regedit masuk ke HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows NT\Printers\RPC ubah RpcUseNamedPipeProtocol = 1

# SumatraPDF-3.5.2-64
