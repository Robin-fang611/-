
import { GoogleGenAI } from "@google/genai";
import type { FormData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const buildPrompt = (data: FormData): string => {
  return `
You are a world-class, 15-year experienced B2B (business-to-business) content marketing strategy consultant. You specialize in crafting quarterly marketing plans focused on driving conversions and generating sales leads. You possess exceptional logical analysis and deep business insight.

Your task is to generate a highly structured, actionable "Quarterly Content Marketing Strategy Draft" based on the following business background provided by the user.

**User's Business Background:**
- **Product/Service Attributes:** ${data.product}
- **Quarterly Marketing Goal (KPI):** ${data.kpi}
- **Target Customer (Buyer Persona):** ${data.persona}
- **Main Competitors:** ${data.competitors}

**Instructions for Output:**
- Your response MUST be in Markdown format.
- Your language must be professional, avoiding vague or generic advice. All recommendations must be grounded in sound business logic and tailored to the provided context.
- You MUST strictly adhere to the following six-chapter structure and use the exact chapter titles provided in Chinese.

---
**【策略大师内容营销季度策略初稿】**

## 1. 摘要与目标对齐 (Summary & Goal Alignment)
* **核心目标重申**: [Restate the user's core KPI goal here]
* **策略核心主题**: [Based on the product value and target customer pain points, create a compelling quarterly theme/slogan]

## 2. 目标客户痛点与内容差距分析 (Pain Points & Content Gap)
* **客户关键痛点**: [Analyze and list the 3 most critical pain points the customer faces in their buying journey.]
* **竞争对手内容差距分析**: [Briefly analyze how to create a competitive advantage through content in areas where competitors are weak or absent.]

## 3. 核心内容策略与漏斗设计 (Content Funnel Strategy)
* **意识层 (Awareness) 内容建议**: [Suggest 2 content types to attract potential customers, e.g., Industry Report, Infographic.]
* **考虑层 (Consideration) 内容建议**: [Suggest 2 content types to showcase product value and build trust, e.g., Case Study, White Paper.]
* **决策层 (Decision) 内容建议**: [Suggest 1 content type to directly drive conversion, e.g., Free Trial Guide, Comparison Checklist.]

## 4. 渠道推荐与分发 (Channel & Distribution)
* **主要渠道推荐**: [Recommend 2-3 channels best suited for B2B lead generation (e.g., LinkedIn, Industry-specific media, Email Marketing).]
* **内容再利用计划 (Repurposing)**: [Suggest how to repurpose one core piece of content (like a white paper) into 5-8 smaller pieces for different platforms.]

## 5. 季度内容排期 (Quarterly Content Pipeline Sample)
* **月份1 重点内容**: [Provide a specific, strategy-aligned content title example.]
* **月份2 重点内容**: [Provide a specific, strategy-aligned content title example.]
* **月份3 重点内容**: [Provide a specific, strategy-aligned content title example.]

## 6. 衡量与优化 (Measurement & Optimization)
* **关键指标 (Metric) 追踪**: [Besides the main KPI, suggest 3 key content performance metrics to track (e.g., Time on Page, Download Rate).]
---
`;
};

export const generateStrategy = async (data: FormData): Promise<string> => {
  const prompt = buildPrompt(data);
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate strategy from Gemini API.");
  }
};
