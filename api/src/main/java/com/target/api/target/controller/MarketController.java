package com.target.api.target.controller;

import com.target.api.target.dto.MarketPageableDto;
import com.target.api.target.facades.market.MarketFacade;
import com.target.api.target.facades.request.MarketBuyRequestDto;
import com.target.api.target.facades.request.MarketPublishRequestDto;
import com.target.api.target.facades.request.PageableRequestDto;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/market",method = RequestMethod.GET)
public class MarketController {

    @Resource(name = "marketFacade")
    private MarketFacade marketFacade;

    @PostMapping("/m")
    public MarketPageableDto market(@RequestBody PageableRequestDto page){
        return marketFacade.getPageableMarketEntry(page);
    }

    @PostMapping("/p")
    public Boolean publish(@RequestBody MarketPublishRequestDto container){
        return marketFacade.publish(container);
    }

    @PostMapping("/b")
    public Boolean buy(@RequestBody MarketBuyRequestDto container){
        return marketFacade.buy(container);
    }
}
