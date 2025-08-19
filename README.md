# AgentKrishi 🌱  
**An AI-Powered Multilingual Agricultural Advisor for Indian Farmers**

AgentKrishi is a comprehensive web application designed to empower Indian farmers through intelligent agricultural guidance, multilingual support, and modern digital tools. The platform provides real-time farming advice, weather insights, pest management, and government scheme information through an intuitive chat interface.

---

## 🚀 Features  

### 🤖 Intelligent Agricultural Chatbot  
- **Smart Knowledge Base**: 20+ pre-loaded Q&A covering crops, fertilizers, pests, irrigation, and more  
- **Contextual Responses**: Matches farmer queries to the most relevant advice  
- **Interactive Chat**: Real-time conversation interface with history & quick actions  

### 🌾 Comprehensive Agricultural Tools  
- **Crop Selection Advice**: Region & season-specific recommendations  
- **Pest & Disease Management**: Identification and treatment guidance  
- **Weather Advisory**: Agricultural weather insights and planning  
- **Government Schemes**: Subsidies, policies, and farmer welfare programs  

### 🌐 Multilingual Support  
- **10+ Indian Languages**: Hindi, Bengali, Telugu, Tamil, Marathi, and more  
- **Translation Features**: Built-in text translation for accessibility  
- **Voice Support**: Text-to-speech & voice input *(planned)*  

### 📱 Modern User Experience  
- **Responsive Design**: Optimized for mobile, tablet, and desktop  
- **Farming-Themed UI**: Professional green color scheme  
- **Offline Capabilities**: Save important advice for offline use  
- **Tools Sidebar**: Quick access to agricultural categories  

---

## 🛠️ Technology Stack  

**Frontend**  
- React 18 + TypeScript  
- Vite (fast dev/build)  
- Tailwind CSS + shadcn/ui  
- TanStack Query (state management)  
- Wouter (lightweight routing)  

**Backend**  
- Express.js + TypeScript  
- Drizzle ORM  
- PostgreSQL (prod) | In-memory DB (dev)  

**Development Tools**  
- ESBuild, HMR  
- TypeScript type checking  
- Replit cloud integration  

---

## 📦 Installation  

### Prerequisites  
- Node.js 18+  
- npm / yarn  

### Quick Start  
```bash
# Clone repo
git clone https://github.com/Kaijin2487/AgentKrishi.git
cd AgentKrishi

# Install dependencies
npm install

# Start dev server
npm run dev

Now visit: [http://localhost:5000](http://localhost:5000) 🚀

### Environment Setup

Create a `.env` file in root:

```env
# Database
DATABASE_URL=your_postgresql_connection_string
PGHOST=localhost
PGPORT=5432
PGUSER=your_username
PGPASSWORD=your_password
PGDATABASE=agentkrishi

# App Settings
NODE_ENV=development
PORT=5000
```

---

## 🗂️ Project Structure

```
AgentKrishi/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilities
│   └── index.html
├── server/                 # Express backend
│   ├── index.ts            # Server entry
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data storage
│   └── vite.ts             # Vite integration
├── shared/                 # Shared types & schemas
│   ├── schema.ts           # DB schemas
│   └── demo-data.ts        # Knowledge base
├── package.json
└── README.md
```

---

## 🌱 Agricultural Knowledge Base

Covers:

* Crop Selection
* Fertilizer Usage
* Pest Control (organic + chemical)
* Irrigation Scheduling
* Soil Health Improvement
* Government Schemes
* Post-harvest Storage
* Market Prices

---

## 🔧 API Endpoints

**Chat API**

* `POST /api/chat` → Send message to chatbot
* `GET /api/chat/messages` → Retrieve history

**Agricultural Data**

* `GET /api/advice` → Category advice
* `GET /api/advice/search` → Search KB
* `GET /api/weather/:location` → Weather
* `GET /api/schemes` → Govt schemes

**Utilities**

* `POST /api/translate` → Translate text
* `POST /api/tts` → Text-to-speech
* `GET /api/demo/queries` → Demo Q\&A

---

## 🚀 Deployment

### Replit (Recommended)

* Fork repo → Replit
* Auto-install dependencies
* Click **Deploy**
* Access app at: `your-repl-name.replit.app`

### Manual

```bash
npm run build    # Build
npm start        # Production server
```

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create feature branch → `git checkout -b feature/amazing-feature`
3. Commit changes → `git commit -m "Add amazing feature"`
4. Push → `git push origin feature/amazing-feature`
5. Open PR 🚀

**Guidelines**

* Follow TypeScript best practices
* Use Tailwind for styling
* Write clear commit messages
* Update docs if needed

---

## 📋 Roadmap

**Phase 1 (Now)**
✅ Chat interface & knowledge base
✅ Responsive design & sidebar
✅ Local DB integration

**Phase 2 (Next)**
🔄 External AI chatbot integration
🔄 Advanced multilingual support
🔄 Voice input/output
🔄 Real-time weather API

**Phase 3 (Future)**
📅 Mobile app
📅 Offline-first
📅 Crop disease detection (AI/ML)
📅 IoT sensor integration
📅 Farmer community features

---

## 📝 License

MIT License – see [LICENSE](LICENSE)

---

## 👥 Team & Acknowledgments

* **Development**: Built with ❤️ for Indian farmers
* **Community**: Contributions welcome!
* **Support**: Open-source agricultural technology

### 📞 Support

* 🐛 Issues: [GitHub Issues](../../issues)
* 💬 Discussions: [GitHub Discussions](../../discussions)
* 📧 Email: [support@agentkrishi.com](mailto:support@agentkrishi.com)

### 🙏 Thanks To

* **Indian Farmers** – inspiration
* **Open Source Community** – libraries/tools
* **Agricultural Experts** – knowledge validation
* **React & TypeScript Communities** – docs

---

🌱 *Made with care for sustainable agriculture in India*

