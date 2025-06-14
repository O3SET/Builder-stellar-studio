import { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  Shield,
  AlertTriangle,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 模拟报告数据
const threatTrendData = [
  { month: "1月", threats: 234, blocked: 187, resolved: 201 },
  { month: "2月", threats: 287, blocked: 245, resolved: 223 },
  { month: "3月", threats: 345, blocked: 298, resolved: 267 },
  { month: "4月", threats: 298, blocked: 267, resolved: 245 },
  { month: "5月", threats: 412, blocked: 356, resolved: 378 },
  { month: "6月", threats: 389, blocked: 334, resolved: 356 },
];

const threatTypeData = [
  { name: "DDoS攻击", value: 35, color: "#ff0040" },
  { name: "恶意软件", value: 28, color: "#ff6600" },
  { name: "钓鱼攻击", value: 22, color: "#ffcc00" },
  { name: "数据泄露", value: 15, color: "#39ff14" },
];

const systemPerformanceData = [
  { time: "00:00", cpu: 45, memory: 62, network: 78 },
  { time: "04:00", cpu: 52, memory: 58, network: 82 },
  { time: "08:00", cpu: 78, memory: 71, network: 95 },
  { time: "12:00", cpu: 85, memory: 79, network: 88 },
  { time: "16:00", cpu: 72, memory: 67, network: 91 },
  { time: "20:00", cpu: 58, memory: 54, network: 76 },
];

const reports = [
  {
    id: "1",
    title: "每日安全威胁报告",
    description: "过去24小时内的威胁检测和防护统计",
    type: "daily",
    generated: "2024-01-15 09:00:00",
    status: "completed",
  },
  {
    id: "2",
    title: "周度安全态势报告",
    description: "本周网络安全态势分析和趋势预测",
    type: "weekly",
    generated: "2024-01-15 06:00:00",
    status: "completed",
  },
  {
    id: "3",
    title: "月度合规性报告",
    description: "本月安全合规性检查和改进建议",
    type: "monthly",
    generated: "2024-01-01 08:00:00",
    status: "completed",
  },
  {
    id: "4",
    title: "实时监控报告",
    description: "当前系统实时监控数据汇总",
    type: "realtime",
    generated: "正在生成...",
    status: "generating",
  },
];

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="cyber-card p-3 border border-neon-blue/30">
        <p className="text-neon-blue font-mono text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [reportType, setReportType] = useState("all");

  const filteredReports = reports.filter(
    (report) => reportType === "all" || report.type === reportType,
  );

  return (
    <div className="min-h-screen matrix-bg">
      <div className="ml-64 p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white glow-text mb-2">
            安全报告中心
          </h1>
          <p className="text-muted-foreground">
            生成和管理安全分析报告，跟踪系统安全态势
          </p>
        </div>

        {/* 快速统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="cyber-card p-6 border-l-4 border-l-neon-blue">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">本月检测威胁</p>
                <p className="text-2xl font-bold text-neon-blue glow-text">
                  2,847
                </p>
                <p className="text-xs text-neon-green">+12% 环比上月</p>
              </div>
              <TrendingUp className="w-8 h-8 text-neon-blue" />
            </div>
          </div>

          <div className="cyber-card p-6 border-l-4 border-l-neon-green">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">成功拦截</p>
                <p className="text-2xl font-bold text-neon-green glow-text">
                  2,534
                </p>
                <p className="text-xs text-neon-green">89% 拦截率</p>
              </div>
              <Shield className="w-8 h-8 text-neon-green" />
            </div>
          </div>

          <div className="cyber-card p-6 border-l-4 border-l-threat-medium">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">处理中告警</p>
                <p className="text-2xl font-bold text-threat-medium glow-text">
                  47
                </p>
                <p className="text-xs text-threat-high">需要关注</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-threat-medium" />
            </div>
          </div>

          <div className="cyber-card p-6 border-l-4 border-l-threat-info">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">监控节点</p>
                <p className="text-2xl font-bold text-threat-info glow-text">
                  156
                </p>
                <p className="text-xs text-neon-green">全部在线</p>
              </div>
              <Eye className="w-8 h-8 text-threat-info" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 威胁趋势图表 */}
          <div className="cyber-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">威胁趋势分析</h3>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-1 bg-matrix-surface border border-matrix-border rounded text-white text-sm"
              >
                <option value="week">最近7天</option>
                <option value="month">最近30天</option>
                <option value="quarter">最近3个月</option>
              </select>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={threatTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                  <XAxis
                    dataKey="month"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="threats"
                    stroke="#ff0040"
                    strokeWidth={2}
                    name="检测威胁"
                  />
                  <Line
                    type="monotone"
                    dataKey="blocked"
                    stroke="#39ff14"
                    strokeWidth={2}
                    name="成功拦截"
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="#00f5ff"
                    strokeWidth={2}
                    name="已解决"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 威胁类型分布 */}
          <div className="cyber-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">
              威胁类型分布
            </h3>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={threatTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {threatTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 系统性能监控 */}
        <div className="cyber-card p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-6">
            系统性能监控
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={systemPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                <XAxis
                  dataKey="time"
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="cpu" fill="#00f5ff" name="CPU使用率" />
                <Bar dataKey="memory" fill="#39ff14" name="内存使用率" />
                <Bar dataKey="network" fill="#ff6600" name="网络使用率" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 报告列表 */}
        <div className="cyber-card">
          <div className="p-6 border-b border-matrix-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">生成的报告</h3>
              <div className="flex items-center space-x-4">
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="px-3 py-1 bg-matrix-surface border border-matrix-border rounded text-white text-sm"
                >
                  <option value="all">所有类型</option>
                  <option value="daily">每日报告</option>
                  <option value="weekly">周度报告</option>
                  <option value="monthly">月度报告</option>
                  <option value="realtime">实时报告</option>
                </select>
                <button className="neon-button flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>生成新报告</span>
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-matrix-border">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="p-6 hover:bg-matrix-accent/50 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileText className="w-5 h-5 text-neon-blue" />
                      <h4 className="text-lg font-semibold text-white">
                        {report.title}
                      </h4>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-mono ${
                          report.status === "completed"
                            ? "bg-neon-green/20 text-neon-green"
                            : "bg-threat-medium/20 text-threat-medium"
                        }`}
                      >
                        {report.status === "completed" ? "已完成" : "生成中"}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {report.description}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      生成时间: {report.generated}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-xs border border-neon-blue/30 text-neon-blue rounded hover:bg-neon-blue/10 transition-colors">
                      查看
                    </button>
                    {report.status === "completed" && (
                      <button className="px-3 py-1 text-xs border border-neon-green/30 text-neon-green rounded hover:bg-neon-green/10 transition-colors flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>下载</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
