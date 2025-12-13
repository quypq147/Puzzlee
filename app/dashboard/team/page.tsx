"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";

export default function TeamPage() {
	const members = [
		{
			id: 1,
			name: "Nguyễn Văn A",
			email: "nguyenvana@example.com",
			role: "Chủ sở hữu",
			joinedAt: "12/10/2023",
			status: { label: "Hoạt động", color: "bg-primary" },
			avatar: { type: "initial", text: "N", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300" },
			actionsDisabled: true,
		},
		{
			id: 2,
			name: "Trần Thị B",
			email: "tranthib@example.com",
			role: "Quản trị viên",
			joinedAt: "15/01/2024",
			status: { label: "Hoạt động", color: "bg-primary" },
			avatar: { type: "image", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4CoUa91bw-cIeXtvnlwtFHDRirT06azR1egDBg0GrFvRFe3h-flAsi6omllZ7fmRZowbNgJgSGDVTCcQqSImNyRJrmPgOyjbwpLZkJ-XdQnsdYBzBppu6Vnua_VaT2iuhsSwd8pxKZWiEB-t-Y6CGyDzVBuBexYnCxdBtK5k-ruDCdx7KP6AhI0tH66RVz3v_o3b74-GPK9vWLa3cPGbizWYjPPnp3uKP-dDmy_N2GATAdGWedEKxmVYe_6Kor_EU5Jj-1EhrxJU" },
		},
		{
			id: 3,
			name: "Lê Văn C",
			email: "levanc@example.com",
			role: "Thành viên",
			joinedAt: "20/02/2024",
			status: { label: "Ngoại tuyến", color: "bg-gray-300 dark:bg-gray-600" },
			avatar: { type: "initial", text: "L", color: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300" },
		},
		{
			id: 4,
			name: "new.member@company.com",
			email: "",
			role: "Thành viên",
			joinedAt: "-",
			status: { label: "Chờ xử lý", color: "bg-yellow-400" },
			invitePending: true,
		},
	];

	return (
		<div className="p-4 md:p-6 space-y-8">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold">Thành viên & Quyền</h1>
					<p className="text-sm text-muted-foreground">
						Quản lý những ai có quyền truy cập vào các sự kiện và cài đặt của tổ chức.
					</p>
				</div>
				<Button className="bg-green-500 hover:bg-green-600 text-white">
					Mời thành viên
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Tổng thành viên</p>
							<p className="text-3xl font-bold mt-1">12</p>
						</div>
						<div className="p-3 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
							<span className="material-icons-outlined">groups</span>
						</div>
					</div>
				</Card>
				<Card className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Quản trị viên</p>
							<p className="text-3xl font-bold mt-1">3</p>
						</div>
						<div className="p-3 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
							<span className="material-icons-outlined">security</span>
						</div>
					</div>
				</Card>
				<Card className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Lời mời đang chờ</p>
							<p className="text-3xl font-bold mt-1">2</p>
						</div>
						<div className="p-3 rounded-full bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
							<span className="material-icons-outlined">mail_outline</span>
						</div>
					</div>
				</Card>
			</div>

			<Card className="overflow-hidden">
				<div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center">
					<div className="relative w-full sm:w-64">
						<span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<span className="material-icons-outlined text-gray-400">search</span>
						</span>
						<Input placeholder="Tìm kiếm thành viên..." className="pl-10" />
					</div>
					<div className="flex gap-2">
						<Button variant="outline" className="flex items-center">
							<span className="material-icons-outlined text-base mr-1">filter_list</span>
							Lọc
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted text-xs font-semibold uppercase tracking-wider">
					<div className="col-span-5 sm:col-span-4">Thành viên</div>
					<div className="col-span-3 sm:col-span-3">Vai trò</div>
					<div className="col-span-2 hidden sm:block">Ngày tham gia</div>
					<div className="col-span-2 hidden sm:block">Trạng thái</div>
					<div className="col-span-2 sm:col-span-1 text-right">Thao tác</div>
				</div>

				<div className="divide-y">
					{members.map((m) => (
						<div key={m.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
							<div className="col-span-5 sm:col-span-4 flex items-center">
								{m.avatar?.type === "image" ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img src={(m.avatar as any).src} alt="Avatar" className="h-10 w-10 rounded-full object-cover" />
								) : (
									<div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-bold ${m.avatar?.color || "bg-gray-200 text-gray-700"}`}>
										{m.avatar?.text || ""}
									</div>
								)}
								<div className="ml-4">
									<div className="text-sm font-medium">{m.name}</div>
									{m.email && <div className="text-sm text-muted-foreground">{m.email}</div>}
									{!m.email && <div className="text-sm text-muted-foreground">Đã gửi lời mời</div>}
								</div>
							</div>

							<div className="col-span-3 sm:col-span-3">
								{m.invitePending ? (
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
										{m.role}
									</span>
								) : m.role === "Chủ sở hữu" ? (
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
										{m.role}
									</span>
								) : (
									<select className="block w-full pl-2 pr-8 py-1 text-xs border rounded-md bg-transparent">
										<option selected>{m.role}</option>
										{m.role !== "Quản trị viên" && <option>Quản trị viên</option>}
										{m.role !== "Thành viên" && <option>Thành viên</option>}
										{m.role !== "Khách" && <option>Khách</option>}
									</select>
								)}
							</div>

							<div className="col-span-2 hidden sm:block text-sm text-muted-foreground">{m.joinedAt}</div>
							<div className="col-span-2 hidden sm:block">
								<div className="flex items-center">
									<div className={`h-2 w-2 rounded-full mr-2 ${m.status.color}`}></div>
									<span className="text-sm text-muted-foreground">{m.status.label}</span>
								</div>
							</div>
							<div className="col-span-2 sm:col-span-1 text-right">
								{m.invitePending ? (
									<Button variant="ghost" className="text-red-500 hover:text-red-600">Hủy lời mời</Button>
								) : (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" disabled={m.actionsDisabled} className="text-muted-foreground">⋮</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<div className="px-2 py-1 text-sm">Chức năng</div>
										</DropdownMenuContent>
									</DropdownMenu>
								)}
							</div>
						</div>
					))}
				</div>

				<div className="px-6 py-4 border-t flex items-center justify-between">
					<div className="text-sm text-muted-foreground">
						Hiển thị <span className="font-medium text-foreground">1</span> đến <span className="font-medium text-foreground">4</span> trong <span className="font-medium text-foreground">12</span> kết quả
					</div>
					<div className="flex space-x-2">
						<Button variant="outline" disabled>
							Trước
						</Button>
						<Button variant="outline">Sau</Button>
					</div>
				</div>
			</Card>

			<Card className="p-6">
				<div className="flex items-start justify-between">
					<div>
						<h3 className="text-lg font-medium">Đăng nhập một lần (SSO)</h3>
						<p className="mt-1 text-sm text-muted-foreground max-w-2xl">
							Cho phép thành viên trong team đăng nhập bằng nhà cung cấp danh tính của tổ chức (SAML, Google Workspace, v.v.). Tính năng này yêu cầu gói Doanh nghiệp.
						</p>
					</div>
					<button
						type="button"
						role="switch"
						aria-checked="false"
						className="bg-gray-200 dark:bg-gray-700 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					>
						<span className="sr-only">Use setting</span>
						<span aria-hidden className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
					</button>
				</div>
				<div className="mt-6 border-t pt-4">
					<Button variant="link" className="text-green-600 hover:text-green-700">
						Cấu hình SSO
					</Button>
				</div>
			</Card>
		</div>
	);
}

