import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Roles } from 'src/modules/auth/guards/roles.decorator';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Post('update')
    async update(@Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(updateOrderDto);
    }
        
        
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get()
    async findAll() {
        return this.ordersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }
    @UseGuards(AuthGuard('jwt') )
    @Get('customer/:id')
    async listByUser(@Param('id') id: string) {
        return this.ordersService.findByUser(id);
    }
}
