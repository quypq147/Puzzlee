"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AnalyticsPage() {
	return (
		<div className="p-4 md:p-6 space-y-8">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-4">
				<div>
					<h2 className="text-2xl font-bold">
						Thống kê sự kiện: <span className="text-green-600">Test Q&A</span>
					</h2>
					<p className="text-sm text-muted-foreground mt-1">Dữ liệu cập nhật lúc 14:30 hôm nay</p>
				</div>
				<div className="flex items-center space-x-3">
					<div className="relative">
						<select className="appearance-none bg-background border rounded-lg py-2 pl-4 pr-10 shadow-sm text-sm">
							<option>7 ngày qua</option>
							<option>30 ngày qua</option>
							<option>Tất cả</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
							▾
						</div>
					</div>
					<Button className="bg-green-500 hover:bg-green-600 text-white">
						Xuất báo cáo
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-sm font-medium text-muted-foreground">Tổng câu hỏi</h3>
						<div className="p-2 rounded-lg bg-blue-50">
							💬
						</div>
					</div>
					<div className="flex items-baseline">
						<span className="text-3xl font-bold">142</span>
						<span className="ml-2 text-sm font-medium text-green-600 flex items-center">+12%</span>
					</div>
				</Card>
				<Card className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-sm font-medium text-muted-foreground">Người tham gia</h3>
						<div className="p-2 rounded-lg bg-purple-50">👥</div>
					</div>
					<div className="flex items-baseline">
						<span className="text-3xl font-bold">85</span>
						<span className="ml-2 text-sm font-medium text-green-600 flex items-center">+5%</span>
					</div>
				</Card>
				<Card className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-sm font-medium text-muted-foreground">Tỷ lệ tương tác</h3>
						<div className="p-2 rounded-lg bg-orange-50">☝️</div>
					</div>
					<div className="flex items-baseline">
						<span className="text-3xl font-bold">68%</span>
						<span className="ml-2 text-sm font-medium text-red-600 flex items-center">-2%</span>
					</div>
				</Card>
				<Card className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-sm font-medium text-muted-foreground">Lượt thích</h3>
						<div className="p-2 rounded-lg bg-pink-50">💗</div>
					</div>
					<div className="flex items-baseline">
						<span className="text-3xl font-bold">320</span>
						<span className="ml-2 text-sm font-medium text-green-600 flex items-center">+18%</span>
					</div>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="p-6 lg:col-span-2">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold">Hoạt động theo thời gian</h3>
					</div>
					<div className="relative h-72 w-full">
						<canvas id="activityChart" />
					</div>
				</Card>
				<Card className="p-6 lg:col-span-1">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold">Chủ đề phổ biến</h3>
					</div>
					<div className="relative h-60 w-full flex justify-center">
						<canvas id="topicChart" />
					</div>
					<div className="mt-6 space-y-3 text-sm">
						<div className="flex items-center justify-between">
							<div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span> Công nghệ</div>
							<span className="font-medium">45%</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span> Marketing</div>
							<span className="font-medium">30%</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span> Nhân sự</div>
							<span className="font-medium">25%</span>
						</div>
					</div>
				</Card>
			</div>

			<Card className="overflow-hidden">
				<div className="px-6 py-5 border-b flex justify-between items-center">
					<h3 className="text-lg font-semibold">Câu hỏi nổi bật nhất</h3>
					<Button variant="link" className="text-green-600 hover:text-green-700">Xem tất cả</Button>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="bg-muted text-xs uppercase text-muted-foreground font-medium tracking-wider">
								<th className="px-6 py-4">Nội dung câu hỏi</th>
								<th className="px-6 py-4">Người hỏi</th>
								<th className="px-6 py-4 text-center">Lượt thích</th>
								<th className="px-6 py-4 text-center">Trạng thái</th>
								<th className="px-6 py-4 text-right">Thời gian</th>
							</tr>
						</thead>
						<tbody className="divide-y text-sm">
							<tr>
								<td className="px-6 py-4 font-medium max-w-xs truncate">Làm thế nào để cải thiện quy trình làm việc từ xa hiệu quả hơn?</td>
								<td className="px-6 py-4">
									<div className="flex items-center">
										<div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs mr-2">A</div>
										Ẩn danh
									</div>
								</td>
								<td className="px-6 py-4 text-center font-medium">42</td>
								<td className="px-6 py-4 text-center">
									<span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Đã trả lời</span>
								</td>
								<td className="px-6 py-4 text-right text-muted-foreground">14:02</td>
							</tr>
							<tr>
								<td className="px-6 py-4 font-medium max-w-xs truncate">Kế hoạch phát triển sản phẩm trong quý 4 là gì?</td>
								<td className="px-6 py-4">
									<div className="flex items-center">
										<div className="h-6 w-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs mr-2">T</div>
										Minh Tuấn
									</div>
								</td>
								<td className="px-6 py-4 text-center font-medium">35</td>
								<td className="px-6 py-4 text-center">
									<span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Đang ghim</span>
								</td>
								<td className="px-6 py-4 text-right text-muted-foreground">14:15</td>
							</tr>
							<tr>
								<td className="px-6 py-4 font-medium max-w-xs truncate">Có thể chia sẻ slide bài thuyết trình này được không?</td>
								<td className="px-6 py-4">
									<div className="flex items-center">
										<div className="h-6 w-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs mr-2">H</div>
										Hoàng Anh
									</div>
								</td>
								<td className="px-6 py-4 text-center font-medium">28</td>
								<td className="px-6 py-4 text-center">
									<span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Chờ duyệt</span>
								</td>
								<td className="px-6 py-4 text-right text-muted-foreground">14:28</td>
							</tr>
							<tr>
								<td className="px-6 py-4 font-medium max-w-xs truncate">Về vấn đề bảo mật dữ liệu, công ty có chính sách gì mới không?</td>
								<td className="px-6 py-4">
									<div className="flex items-center">
										<div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs mr-2">A</div>
										Ẩn danh
									</div>
								</td>
								<td className="px-6 py-4 text-center font-medium">19</td>
								<td className="px-6 py-4 text-center">
									<span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Đã trả lời</span>
								</td>
								<td className="px-6 py-4 text-right text-muted-foreground">13:45</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Card>

			<div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
				<p>© 2025 Puzzlee. All rights reserved.</p>
				<div className="flex space-x-4 mt-4 md:mt-0">
					<a className="hover:text-green-600" href="#">Điều khoản</a>
					<a className="hover:text-green-600" href="#">Bảo mật</a>
					<a className="hover:text-green-600" href="#">Liên hệ</a>
				</div>
			</div>
		</div>
	);
}

