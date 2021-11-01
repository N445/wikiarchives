<?php

namespace App\Model\User;

class UserStats
{
    /**
     * @var int
     */
    private $accepted = 0;
    /**
     * @var int
     */
    private $refused = 0;
    /**
     * @var int
     */
    private $total = 0;
    
    /**
     * @return int
     */
    public function getAccepted(): int
    {
        return $this->accepted;
    }
    
    /**
     * @return UserStats
     */
    public function addAccepted(): UserStats
    {
        $this->accepted++;
        return $this;
    }
    
    /**
     * @return int
     */
    public function getRefused(): int
    {
        return $this->refused;
    }
    
    /**
     * @return UserStats
     */
    public function addRefused(): UserStats
    {
        $this->refused++;
        return $this;
    }
    
    /**
     * @return int
     */
    public function getTotal(): int
    {
        return $this->total;
    }
    
    /**
     * @return UserStats
     */
    public function addTotal(): UserStats
    {
        $this->total++;
        return $this;
    }
    
    /**
     * @return float|int
     */
    public function getRatioAccepted(): float|int
    {
        if (0 === $this->total) {
            return 0;
        }
        return $this->accepted / $this->total;
    }
    
    /**
     * @return float|int
     */
    public function getRatioRefused(): float|int
    {
        if (0 === $this->total) {
            return 0;
        }
        return $this->accepted / $this->total;
    }
}