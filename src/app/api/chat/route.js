export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message) {
      return Response.json({ error: "Missing message query" }, { status: 400 });
    }

    const cleanMsg = message.toLowerCase().trim();
    let reply = "";

    if (cleanMsg.includes("demo") || cleanMsg.includes("schedule") || cleanMsg.includes("book")) {
      reply = "To schedule a live technical demonstration of our AI models and connect to our test sandbox, please navigate to our Contact Us page and click the 'Schedule Demo Session' tab. We'll set up a screen share.";
    } else if (
      cleanMsg.includes("service") || 
      cleanMsg.includes("offer") || 
      cleanMsg.includes("nlp") || 
      cleanMsg.includes("vision") || 
      cleanMsg.includes("predictive") || 
      cleanMsg.includes("agent")
    ) {
      reply = "Ai Solutions provides four primary software solutions: 1. Autonomic AI Agents (multi-agent recursive script execution), 2. Computer Vision Systems (low-latency segmenting and inspection), 3. Predictive Analytics Pipelines (infrastructure stress stress-testing), and 4. Natural Language Processing (real-time sentiment and intent routing). Read more on our Solutions page!";
    } else if (cleanMsg.includes("project") || cleanMsg.includes("experience") || cleanMsg.includes("case study") || cleanMsg.includes("past")) {
      reply = "We have deployed production integrations across multiple verticals, including FinTech transaction routing pipelines (+300% processing speed), LogiTech sorting inspection systems (99.8% sorting accuracy), and risk prediction models. View all details on our Projects page.";
    } else if (cleanMsg.includes("contact") || cleanMsg.includes("email") || cleanMsg.includes("phone") || cleanMsg.includes("reach")) {
      reply = "You can contact our team directly at integrations@aisolutions.com, call our line at +1 (800) 555-0199, or fill out the form on our Contact page.";
    } else if (cleanMsg.includes("admin") || cleanMsg.includes("login") || cleanMsg.includes("dashboard")) {
      reply = "Our secure Admin Dashboard can be reached at /admin. Login requires authenticated credentials configured in process environment files.";
    } else if (cleanMsg.includes("hello") || cleanMsg.includes("hi") || cleanMsg.includes("hey")) {
      reply = "Hello there! I'm Aura, your virtual developer assistant. Ask me about our AI solutions, scheduling a sandbox demo, or viewing past client experiences!";
    } else {
      reply = "I understand you are asking about our AI integrations. Ai Solutions builds deep learning software solutions including NLP text parsing, predictive models, edge computer vision, and autonomic agent workflows. Would you like details on one of these or guidance on booking a demo?";
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
