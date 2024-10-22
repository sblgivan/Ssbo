import json
import os
from datetime import datetime

class TradingMiddleware:
    def __init__(self):
        self.log_file = "trading_log.json"
        self.trading_data = self.load_data()

    def load_data(self):
        if os.path.exists(self.log_file):
            with open(self.log_file, 'r') as f:
                return json.load(f)
        return {"trades": [], "performance": {}}

    def save_data(self):
        with open(self.log_file, 'w') as f:
            json.dump(self.trading_data, f)

    def log_trade(self, trade_data):
        trade_data["timestamp"] = datetime.now().isoformat()
        self.trading_data["trades"].append(trade_data)
        self.save_data()

    def update_performance(self, metrics):
        self.trading_data["performance"] = metrics
        self.save_data()

    def get_trading_history(self):
        return self.trading_data["trades"]

    def get_performance_metrics(self):
        return self.trading_data["performance"]
