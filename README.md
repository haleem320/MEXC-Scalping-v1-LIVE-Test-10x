# MEXC Scalping v1 — LIVE TEST

Live execution is enabled by environment variables. Default test sizing is 5 USDT notional with 2x leverage, max 2 open positions, and a 3% daily loss block. Never place API secrets in this ZIP.

MEXC Futures authentication uses HMAC-SHA256 with accessKey + request-time + request body/query string. The official API documents the order endpoint as `POST /api/v1/private/order/submit` and supports market orders plus stopLossPrice/takeProfitPrice fields; the same documentation currently marks the order endpoint as “Under maintenance”, so an API error may be returned even with correct credentials.
